import bcrypt from "bcrypt";
import { loginService } from "../routes/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if (!user) {
      return res.status(404).send({ message: "Invalid email or password" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { login };
