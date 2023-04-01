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

	function LRRow({vertical}) {
		return <div style={{display: 'flex', fontSize: '13em'}}>
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
				if (line === 'OOO' || line === 'XXX') {
					setPossibleToClick(false);
				}
			}

			// vertical
			for (let iCol in [0, 1, 2]) {
				const line = [0, 1, 2].map(iLine => ttt[iLine][iCol]).join('');
				// console.log(iCol, line);
				if (line === 'OOO' || line === 'XXX') {
					setPossibleToClick(false);
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
	}

	return (<div>
			<div style={{display: 'flex', justifyContent: 'start'}}>
				<div style={{
					fontSize: '20pt',
					fontFamily: 'DejaVu Sans',
				}}
				>Next Turn: <X0>{nextTurn}</X0></div>
			</div>
			<div className="App" style={{userSelect: 'none'}}>
				<LRRow vertical={0}></LRRow>
				<Line/>
				<LRRow vertical={1}></LRRow>
				<Line/>
				<LRRow vertical={2}></LRRow>

				<div style={{display: 'flex', justifyContent: 'end'}}>
					<button onClick={reset}>
						Reset Game
					</button>
				</div>
			</div>
		</div>
	)
}

