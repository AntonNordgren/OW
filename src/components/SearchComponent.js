import React from 'react';

import bronze from '../images/bronze.png';
import silver from '../images/silver.png';
import gold from '../images/gold.png';
import platinum from '../images/platinum.png';
import diamond from '../images/diamond.png';
import master from '../images/master.png';
import grandmaster from '../images/grandmaster.png';
// import top500 from '../images/top500.png';

import tank from '../images/tank.png';
import damage from '../images/damage.png';
import support from '../images/support.png';

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputString: "",
            isLoading: false,
            firstSearch: true,
            playerFound: false,
            playerData: {
            }
        };
    };

    InputChangeHandler = event => {
        this.inputString = event.target.value
    }
    
    OnClickHandler = event => {
        console.log(this.inputString)

        if(this.state.firstSearch) {
            this.setState({

                firstSearch: false

            })
        }

        this.setState({
            isLoading: true
        })

        
        fetch("https://ow-api.com/v1/stats/pc/" + "/" + this.inputString.replace("#", "-") + "/profile")
            .then(res => res.json())
            .then(res => {

                this.setState({
                    isLoading: false
                })
                console.log(res)

                // JSON.stringify(obj1) === JSON.stringify(obj2)

                if (JSON.stringify(res) !== JSON.stringify({ error: "Player not found" })) {

                    console.log("player found")

                    this.setState({
                        isLoading: false,
                        playerFound: true,
                        playerData: {
                            name: res.name,
                            playerIcon: res.icon,
                            ratings: res.ratings,
                        }
                    })

                }
                else {

                    console.log("player not found")

                    this.setState({
                        isLoading: false,
                        playerFound: false
                    })
                }
            }
            )
    }
    
    render() {

        let playerDataDiv

        // if(!Object.keys(this.state.playerData).length && !this.state.isLoading)

        console.log(this.state)

        if(this.state.playerFound) {

            console.log("trying to rnder data")


            function findIcon(rating) {
                console.log(rating)

                if(rating < 1500) {
                    return bronze
                }
                else if(rating > 1499 && rating < 2000) {
                    return silver
                }
                else if(rating > 1999 && rating < 2500) {
                    return gold
                }
                else if(rating > 2499 && rating < 3000) {
                    return platinum
                }
                else if(rating > 2999 && rating < 3500) {
                    return diamond
                }
                else if(rating > 3499 && rating < 4000) {
                    return master
                }
                else if(rating > 3999) {
                    return grandmaster
                }

            }

            function findRole(role) {
                if(role === "tank") {
                    return tank
                }
                else if(role === "damage") {
                    return damage
                }
                else if(role === "support") {
                    return support
                }
            }

            let ratingList = []
            if(this.state.playerData.ratings !== null && !this.state.isLoading && this.state.playerData.ratings !== undefined) {

                    this.state.playerData.ratings.map((rating) => {

                        ratingList.push(
                            <div className="rating-item" key={rating.role}>
                                <div className="rating-text">
                                    <div className="role-icon-div">
                                        <img src={findRole(rating.role)} className="role-images" alt={rating.role} />
                                    </div>
                                        {
                                            rating.level + " SR"
                                        }
                                </div>
                                <img src={findIcon(rating.level)} alt="" className="rank-images" />
                            </div>
                        )

                        
                    })

            }

            playerDataDiv = 
            <div className="SearchComponent-result">
                <div className="playerHeader">
                    <img className="playerIcon" src={this.state.playerData.playerIcon} alt="PlayerIcon" />
                    <div className="SearchComponent-result-playerName">{this.state.playerData.name}</div>
                </div>
                <div>
                    {ratingList}
                </div>

            </div>
        }
        else if(this.state.isLoading) {
            playerDataDiv = 
            <div className="SearchComponent-result">

                <img className="loading-gif" src="https://icon-library.net/images/loading-icon-transparent-background/loading-icon-transparent-background-3.jpg" alt="loading" />

            </div>
        }
        else if(!this.state.isLoading && !this.state.playerFound) {

            function findInstructionText(firstSearch, foundPlayer) {
                if( firstSearch )
                    return "Search Overwatch player on PC. You need battletag"
                else if( !firstSearch && !foundPlayer )
                    return "No player found"
            }

            playerDataDiv =
            <div className="SearchComponent-result">
                <div className="instructionText"> {findInstructionText(this.state.firstSearch, this.state.playerFound)}</div>
            </div>
            
        }

        return (
            <div className="SearchComponent">
                
                <div className="SearchComponent-input-field">
                    <div className="SearchComponent-margindiv">
                        <div className="search">
                            <input onChange={this.InputChangeHandler} type="text" className="searchTerm" placeholder="Search Player" />
                            <div onClick={this.OnClickHandler}>
                                <button type="submit" className="searchButton">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                {playerDataDiv}
            </div>

        );

    };
}

export default SearchComponent;