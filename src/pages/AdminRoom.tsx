import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom'

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { database } from '../services/firebase';
import { Question } from '../components/Question';

import deleteImg from '../assets/delete.svg'
import logoImg from '../assets/logo.svg'

import '../styles/room.scss'

type RoomParams = {
	id: string;
}

export function AdminRoom() {

	const { user } = useAuth();

	const params = useParams<RoomParams>();
	const roomId = params.id;

	const [ newQuestion, setNewQuestion ] = useState('');
	const { questions, title } = useRoom(roomId)

	const history = useHistory(); 

	async function handleEndRoom() {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});

		history.push('/')
	}

	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Logo Let me ask" />
					<div>
						<RoomCode code={roomId} />
						<Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
					</div>
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Sala: {title}</h1>
					{ questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
				</div>

				<div className="question-list">
					{questions.map(question => {
						return (
							<Question 
								key={question.id} 
								content={question.content} 
								author={question.author} 
							>
								<button type="button" onClick={() => handleDeleteQuestion(question.id)}>
									<img src={deleteImg} alt="Deletar pergunta" />
								</button>
							</Question>
						)
					})}
				</div>
			</main>
		</div>
	)
}