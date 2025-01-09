import styles from "./styles.module.scss";
import { Button, Form, Input } from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { useCallback } from "react";
import { useLogin } from "@web/contexts/auth/hooks";
import { AuthCredentials } from "@models/auth";

function LoginPage() {
	const login = useLogin();

	const onFinish = useCallback(async (values: Record<string, unknown>) => {
		return await login(AuthCredentials.fromJSON(values));
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.formLoginContainer}>
				<Form
					size="middle"
					layout="vertical"
					onFinish={onFinish}
					className={styles.loginForm}
				>
					<Form.Item
						className={styles.formInput}
						label="Usuário"
						name="email"
						required={false}
						rules={[
							{
								required: true,
								message: "Por favor, Digite Seu E-mail!",
							},
							{
								type: "email",
								message:
									"Digite o E-mail seguindo o padrão: nome@email.com",
							},
						]}
					>
						<Input
							className={styles.inputBorderColor}
							type="email"
							placeholder="Usuário"
							size="large"
							suffix={<BiUser size={24} />}
						/>
					</Form.Item>
					<Form.Item
						className={styles.formInput}
						label="Senha"
						name="password"
						required={false}
						rules={[
							{
								required: true,
								message: "Por Favor, Digite Sua Senha!",
							},
						]}
					>
						<Input.Password
							className={styles.inputBorderColor}
							type="password"
							placeholder="Senha"
							size="large"
							iconRender={(visible) =>
								visible ? (
									<AiOutlineEye size={24} />
								) : (
									<AiOutlineEyeInvisible size={24} />
								)
							}
						/>
					</Form.Item>

					<Form.Item>
						<Button
							className={styles.LoginButton}
							block
							htmlType="submit"
							size="large"
						>
							Enviar
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}

export default LoginPage;