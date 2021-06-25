import copyImg from '../assets/copy.svg'
import '../styles/room-code.scss'

type RoomCodeProps = {
	code: string;
}

export function RoomCode(props: RoomCodeProps) {

	function handleCopyCodeRoom() {
		navigator.clipboard.writeText(props.code);
	}

	return (
		<button className="room-code" onClick={handleCopyCodeRoom}>
			<div>
				<img src={copyImg} alt="Imagem de copiar código da sala" />
			</div>
			<span>Sala: #{props.code}</span>
		</button>
	)
}