import {useState} from 'react'
import './App.css'

export default function App() {
	const [nextTurn, set0X] = useState('X')
	let initialGame = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];
	const [ttt, setTTT] = useState(initialGame);
	const [possibleToClick, setPossibleToClick] = useState(true);
	const [winner, setWinner] = useState(null);
	const [lineType, setLineType] = useState(null);

	function LRRow({vertical}) {
		let redLineIndex;
		if (lineType) {
			let lineTypeSplit = lineType.split('');
			if (lineTypeSplit[0] === 'H') {
				redLineIndex = Number(lineTypeSplit[1]);
			}
		}
		return <div style={{position: 'relative'}}>
			<div style={{display: 'flex', fontSize: '13em'}}>
				<Cell horizontal={0} vertical={vertical}>
					{ttt[vertical][0]}
				</Cell>
				<Cell horizontal={1} vertical={vertical} style={{
					borderLeft: 'solid 1px silver',
					borderRight: 'solid 1px silver'
				}}>
					{ttt[vertical][1]}
				</Cell>
				<Cell horizontal={2} vertical={vertical}>
					{ttt[vertical][2]}
				</Cell>
			</div>
			{vertical === redLineIndex && (
				<hr style={{
					border: 'solid 10px red',
					margin: 0,
					marginTop: '-9em',
					position: 'absolute',
					width: '100%',
				}}/>
			)}
		</div>
	}


	function Cell({children, style, horizontal, vertical}) {
		const clickInCell = () => {
			if (!possibleToClick) {
				return;
			}
			console.log('click');
			// set0X(nextTurn === 'X' ? '0' : 'X')

			if (!ttt[vertical][horizontal]) {
				setTTT(ttt => {
					ttt[vertical][horizontal] = nextTurn;
					checkGameOver(ttt);
					return ttt;
				})

				if (nextTurn === 'X') {
					set0X('O');
				} else {
					set0X('X')
				}
			}
		}

		const checkGameOver = (ttt: string[][]) => {
			// horizontal
			for (let iLine in [0, 1, 2]) {
				const line = ttt[iLine].join('');
				// console.log(iLine, line);
				if (line === 'OOO') {
					setPossibleToClick(false);
					setWinner('O')
					setLineType('H' + iLine);
				}
				if (line === 'XXX') {
					setPossibleToClick(false);
					setWinner('X');
					setLineType('H' + iLine);
				}
			}

			// vertical
			for (let iCol in [0, 1, 2]) {
				const line = [0, 1, 2].map(iLine => ttt[iLine][iCol]).join('');
				// console.log(iCol, line);
				if (line === 'OOO') {
					setPossibleToClick(false);
					setWinner('O');
					setLineType('V' + iCol);
				}
				if (line === 'XXX') {
					setPossibleToClick(false);
					setWinner('X');
					setLineType('V' + iCol);
				}
			}

			// diagonal 1
			const line = [0, 1, 2].map(i => ttt[i][i]).join('');
			// console.log(line);
			if (line === 'OOO' || line === 'XXX') {
				setPossibleToClick(false);
			}

			// diagonal 2
			const line2 = [[0, 2], [1, 1], [2, 0]].map(([x, y]) => ttt[y][x]).join('');
			console.log(line2);
			if (line2 === 'OOO' || line2 === 'XXX') {
				setPossibleToClick(false);
			}
		}

		return <div
			style={{
				width: '1.3em',
				height: '1.3em',
				textAlign: 'center',
				overflow: 'hidden',
				...style
			}}
			onClick={clickInCell}
		>
			<div style={{marginTop: '-0.15em', overflow: 'hidden'}}>
				<X0>{children}</X0>
			</div>
		</div>
	}

	function X0({children}) {
		return <>
			{children === 'X' && <span style={{color: '#416cc4'}}>✖</span>}
			{children === 'O' && <span style={{color: '#b850a5'}}>Ο</span>}
		</>
	}

	function Line() {
		return <div style={{border: 'solid 1px silver'}}></div>
	}

	const reset = () => {
		setTTT(initialGame);
		setPossibleToClick(true);
		set0X('X');
		setWinner(null);
		setLineType(null);
	}

	let redLinePos;
	if (lineType && lineType.split('')[0] === 'V') {
		redLinePos = Number(lineType.split('')[1]);
	}


	return (<div>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<div style={{
					fontSize: '20pt',
					fontFamily: 'DejaVu Sans',
				}}
				>Next Turn: <X0>{nextTurn}</X0></div>
				{winner && (
					<div style={{
						fontSize: '20pt',
						fontFamily: 'DejaVu Sans',
					}}
					>Winner: <X0>{winner}</X0></div>
				)}
			</div>
			<div className="App" style={{userSelect: 'none'}}>
				<div style={{position: 'relative'}}>
					<LRRow vertical={0}></LRRow>
					<Line/>
					<LRRow vertical={1}></LRRow>
					<Line/>
					<LRRow vertical={2}></LRRow>

					{redLinePos >= 0 && (
						<hr style={{
							border: 'solid 10px red',
							margin: 0,
							marginTop: '-26em',
							marginLeft: (-17.50 + (redLinePos * 16.9)) + 'em',
							position: 'absolute',
							width: '100%',
							transform: 'rotate(90deg)',
						}}/>
					)}
				</div>

				<div style={{display: 'flex', justifyContent: 'end'}}>
					<button onClick={reset}>
						Reset Game
					</button>
				</div>
			</div>
		</div>
	)
}

