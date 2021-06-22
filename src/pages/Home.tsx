import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleIconImg from '../assets/google-icon.svg'

import '../styles/auth.scss'

export function Home() {
	return (
		<div id="page-auth">
			<aside>
				<img src={illustrationImg} alt="Imagem de ilustração que simboliza perguntas e respostas" />
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo real.</p>
			</aside>

			<main>
				<div className="main-content">
					<img src={logoImg} alt="Let me ask Logo" />
					<button className="create-room">
						<img src={googleIconImg} alt="Ícone do Google" />
						Crie sua sala com o Google
					</button>

					<div className="separator">Ou entre em uma sala</div>
					<form>
						
						<input type="text" placeholder="Digite o código da sala" />
						<button type="submit">Entrar na sala</button>
					</form>
				</div>
			</main>
		</div>
	)
}