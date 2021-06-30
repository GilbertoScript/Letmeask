import { useHistory } from 'react-router-dom'
import { auth, database, firebase } from '../services/firebase'

import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react';
import { Button } from '../components/Button'

import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleIconImg from '../assets/google-icon.svg'

import '../styles/auth.scss'

export function Home() {

	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();

	const [roomCode, setRoomCode] = useState('');

	async function handleCreateRoom() {

		if(!user) {
			await signInWithGoogle();
		}

		history.push('/rooms/new');
	}

	async function handleJoinRoom(event: FormEvent) {
							   
		event.preventDefault();

		if(roomCode.trim() == '') {
			return;
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if(!roomRef.exists()) {
			alert('A sala em questão não existe.')
			return;
		}

		if(roomRef.val().endedAt) {
			alert('A sala em questão foi fechada pelo administrador.')
			return;
		}

		history.push(`/rooms/${roomCode}`)
	}

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
					<button 									
						onClick={handleCreateRoom} 			
						className="create-room"					
					>
						<img src={googleIconImg} alt="Ícone do Google" />
						Crie sua sala com o Google
					</button>

					<div className="separator">Ou entre em uma sala</div>
					<form onSubmit={handleJoinRoom}>
						
						<input 
							type="text" 
							placeholder="Digite o código da sala"
							onChange={event => setRoomCode(event.target.value)} 
							value={roomCode}
						/>
						<Button type="submit">
							Entrar na sala
						</Button>
					</form>

					<footer>
						Developed by -
						<a target="_blank" href="https://portfolio-gsj.vercel.app/">Gilberto</a>
					</footer>
				</div>
			</main>

				
		</div>
	)
}