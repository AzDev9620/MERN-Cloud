const Router = require("express");
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const authMiddleware = require('../middleware/auth.middleware');
const fileService = require("../services/fileService");
const File = require("../models/File");
const router = new Router()
router.post('/registration',
    [
        check('email', "Неправильный адрес электронной почты").isEmail(),
        check('password', 'Пароль должен быть длиннее 5 и короче 12').isLength({ min: 5, max: 12 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Неверный запрос", errors })
            }
            const { email, password } = req.body
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: `Пользователь с электронной почтой ${email} уже существует` })
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({ email, password: hashPassword })
            await fileService.createDir(new File({user: user.id, name: ''}))
            await user.save()
            res.json({ message: "Пользователь создан" })
        } catch (e) {
            res.send({ message: "Ошибка сервера" })
        }
    })

router.post('/login',
    async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({ message: "Invalid password" })
            }
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" })
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" })
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (err) {
        console.log(err);
        res.send({ message: "Server error" })
    }
})


module.exports = router
