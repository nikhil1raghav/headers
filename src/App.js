import {useState} from 'react'
import {useRef} from 'react'
import {useEffect} from 'react'
import Picker from './components/Picker'
import './App.css'

const Board=({color, text, textColor, subText})=>{
	return(
		<div id="board" style={{backgroundColor:color}}>
		<h2 id="heading" style={{color:textColor}}>{text}</h2>
		<p id="subheading" style={{color:textColor}}>{subText}</p>
		</div>
	)
}
const Canvas=({color, textColor, text, subText, getLink})=>{
	let ref=useRef();
	let link="";
	useEffect(()=>{
		console.log("using",color);
		let canvas=ref.current;
		let context=canvas.getContext('2d');
		canvas.width=1500;canvas.height=500;
		context.fillStyle=color;
		context.fillRect(0,0,1500,500);
		context.fillStyle=textColor;
		context.font="900 70px Poppins";
		context.textAlign='right';
		context.fillText(text, 1400,200,768);
		context.font="300 30px Poppins";
		context.fillText(subText,1400,270,800);
		let data=canvas.toDataURL();
		link=data.replace("image/png","image/octet-stream");
		getLink(link);
	});
	return(
		<canvas ref={ref}
		/>
	);
}



const App=()=>{

	const[color,setColor]=useState('#3b82f6');
	const[text,setText]=useState("Hi! I'm Nikhil");
	const[subText,setSubText]=useState("I love computers and books");
	const [textColor, setTextColor]=useState('#fff');
	const colorChange=(e)=>setColor(e.hex);
	const textColorChange=(e)=>setTextColor(e.hex);
	let link="";
	const handleDownload=(l)=>link=l;
	
	const imgDownload=(e)=>{
		e.preventDefault();
		let l=document.createElement('a');
		l.download="twitter.png"
		l.href=link;
		l.click();
	}
	return(
		<div>
		<h1 style={{color:color}}>Color: {color}</h1>
		<h1>{link}</h1>
		<h2>Text: {text} </h2>
		<Board color={color} text={text} textColor={textColor} subText={subText}/>
		<form id="color" action={link}>
		<span> Text Color : <Picker color={textColor} onColorChange={textColorChange}/></span>
		<span> Background Color : <Picker color={color} onColorChange={colorChange}/></span>
		<input type="text" value={text} name="text" onChange={(e)=>setText(e.target.value)}/>
		<input type="text" value={subText} name="sometext" onChange={(e)=>setSubText(e.target.value)}/>
		<button type="submit" onClick={imgDownload}>Download</button>

		<Canvas color={color} textColor={textColor} text={text} subText={subText} getLink={handleDownload}/>

		</form>
		</div>
	)
}
export default App;
