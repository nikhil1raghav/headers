import React from 'react'
import reactCSS from 'reactcss'
import {SketchPicker} from 'react-color'
class Picker extends React.Component{
	state={
		displayColorPicker:false,
		color:this.props.color,
	};

	handleClick=()=>{
		this.setState({
			displayColorPicker : !this.state.displayColorPicker
		})
	};

	handleClose=()=>{
		this.setState({displayColorPicker:false})
	};

	handleChange=(color)=>{
		this.props.onColorChange(color);
	};

	render(){
		const styles=reactCSS({
			'default':{
				color:{
					width:'36px',
					height:'14px',
					borderRadius:'2px',
					background:this.props.color,
				},

				swatch:{
					padding:'5px',
					background:'#0',
					borderRadius:'1px',
					borderColor:'#0',
					display:'inline-block',
					cursor:'pointer',
				},
				popover:{
					position:'absolute',
					zIndex:'2',
				},

				cover:{
					position:'fixed',
					top:'0px',
					right:'0px',
					bottom:'0px',
					left:'0px',
				},
			},
		});

		return(
			<div>
			<div style={styles.swatch} onClick={this.handleClick}>
			<div style={styles.color}/>
			</div>
			{this.state.displayColorPicker?<div style={styles.popover}><div style={styles.cover} onClick={this.handleClose}/>
				<SketchPicker color={this.state.color} onChange={this.handleChange}/></div> : null}
			</div>
		)
	}
}

export default Picker;
