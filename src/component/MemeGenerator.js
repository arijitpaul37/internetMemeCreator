import React, { Component } from 'react';

class MemeGenerator extends Component {

    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {

        fetch("https://api.imgflip.com/get_memes")
            .then(data => data.json())
            .then(response => {
                const memes = response.data.memes
                console.log(memes[0])
                this.setState({
                    allMemeImgs: memes
                })
            })
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    } 

    handleClick(event){
        event.preventDefault()
        let min = 0
        let max = this.state.allMemeImgs.length - 1
        let index = Math.floor(Math.random() * (max - min + 1)) + min
        this.setState({
            randomImg: this.state.allMemeImgs[index].url
        })
    }

    render() {
        return (
            <div>
                <form className="meme-form">
                    <input type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange} 
                    />

                    <input type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange} 
                    />

                    <button onClick={this.handleClick}>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
            
        )
    }

}

export default MemeGenerator