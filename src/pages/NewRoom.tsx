import { Link } from 'react-router-dom'

import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'

export function NewRoom() {

	const { user, signInWithGoogle } = useAuth();

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
					
					<h2>Criar uma nova sala</h2>
					<form>
						
						<input type="text" placeholder="Nome da sala" />
						<Button type="submit">
							Criar sala
						</Button>
					</form>

					<p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
				</div>
			</main>
		</div>
	)
}