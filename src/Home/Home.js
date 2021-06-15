import React from 'react';
import './Home.css';

const testJsonData = [
    {
        "roundId": 3,
        "date": "2021-04-20T18:17:03",
        "courseName": "CHARWOOD",
        "coursePar": 72,
        "hole1": 4,
        "hole2": 4,
        "hole3": 4,
        "hole4": 4,
        "hole5": 4,
        "hole6": 4,
        "hole7": 4,
        "hole8": 4,
        "hole9": 4,
        "hole10": 4,
        "hole11": 4,
        "hole12": 4,
        "hole13": 4,
        "hole14": 4,
        "hole15": 4,
        "hole16": 4,
        "hole17": 4,
        "hole18": 4
    },
    {
        "roundId": 4,
        "date": "2021-02-20T11:11:03",
        "courseName": "Golden Hills",
        "coursePar": 73,
        "hole1": 5,
        "hole2": 4,
        "hole3": 5,
        "hole4": 4,
        "hole5": 5,
        "hole6": 4,
        "hole7": 5,
        "hole8": 4,
        "hole9": 5,
        "hole10": 4,
        "hole11": 5,
        "hole12": 4,
        "hole13": 5,
        "hole14": 4,
        "hole15": 5,
        "hole16": 4,
        "hole17": 5,
        "hole18": 4
    },
    {
        "roundId": 5,
        "date": "2021-02-20T11:11:03",
        "courseName": "golden hills",
        "coursePar": 36,
        "hole1": 0,
        "hole2": 0,
        "hole3": 0,
        "hole4": 0,
        "hole5": 0,
        "hole6": 0,
        "hole7": 0,
        "hole8": 0,
        "hole9": 0,
        "hole10": 4,
        "hole11": 5,
        "hole12": 4,
        "hole13": 5,
        "hole14": 4,
        "hole15": 5,
        "hole16": 4,
        "hole17": 5,
        "hole18": 4
    }
]

class Home extends React.Component {
    render() {
      return (
        <div className="HomeContainer">
            <RoundsList />
        </div>
        );
    }
}

class RoundsList extends React.Component {
    createRound(round) {
        return <Round round={round} />;
    }
    
    createRounds(rounds) {
        return rounds.map(this.createRound);
    }

    render(){
        return (
            <div className="AllRoundsContainer">
                {this.createRounds(testJsonData)}
            </div>
        );
    }
}

class Round extends React.Component {
    // the Round data will be stored in props
    constructor(props) {
        super(props);
        let total = this.props.round.hole1 + 
                         this.props.round.hole2 + 
                         this.props.round.hole3 + 
                         this.props.round.hole4 + 
                         this.props.round.hole5 + 
                         this.props.round.hole6 + 
                         this.props.round.hole7 + 
                         this.props.round.hole8 + 
                         this.props.round.hole9 + 
                         this.props.round.hole10 + 
                         this.props.round.hole11 + 
                         this.props.round.hole12 + 
                         this.props.round.hole13 + 
                         this.props.round.hole14 + 
                         this.props.round.hole15 + 
                         this.props.round.hole16 + 
                         this.props.round.hole17 + 
                         this.props.round.hole18;
        this.state = {
            totalScore: total,
            netScore: total - props.round.coursePar
        }
    }

    render() {
        return (
            <div className="RoundTableContainer">
                <table className="RoundTable">
                    <thead className="RoundTableHeader">
                        <tr className="RoundTableHeaderRow">
                            <th>Course</th>
                            <th>Date</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>11</th>
                            <th>12</th>
                            <th>13</th>
                            <th>14</th>
                            <th>15</th>
                            <th>16</th>
                            <th>17</th>
                            <th>18</th>
                            <th>Your Score</th>
                            <th>Course Par</th>
                            <th>Net Score</th>
                        </tr>
                    </thead>
                    <tbody className="RoundTableBody">
                        <tr className="RoundTableBodyRow">
                            <td>{this.props.round.courseName}</td>
                            <td>{this.props.round.date}</td>
                            <td>{this.props.round.hole1}</td>
                            <td>{this.props.round.hole2}</td>
                            <td>{this.props.round.hole3}</td>
                            <td>{this.props.round.hole4}</td>
                            <td>{this.props.round.hole5}</td>
                            <td>{this.props.round.hole6}</td>
                            <td>{this.props.round.hole7}</td>
                            <td>{this.props.round.hole8}</td>
                            <td>{this.props.round.hole9}</td>
                            <td>{this.props.round.hole10}</td>
                            <td>{this.props.round.hole11}</td>
                            <td>{this.props.round.hole12}</td>
                            <td>{this.props.round.hole13}</td>
                            <td>{this.props.round.hole14}</td>
                            <td>{this.props.round.hole15}</td>
                            <td>{this.props.round.hole16}</td>
                            <td>{this.props.round.hole17}</td>
                            <td>{this.props.round.hole18}</td>
                            <td>{this.state.totalScore}</td>
                            <td>{this.props.round.coursePar}</td>
                            <td>{this.state.netScore}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Home;