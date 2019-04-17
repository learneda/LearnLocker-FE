import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getUserProfileDetails, recommendedFollow } from '../../actions';

class RecommendedFollow extends Component {
  componentDidMount() {
    this.props.recommendedFollow(this.props.auth.id);
  }

  renderRecommended = () => {
    const { follow } = this.props;
    if (follow.length > 0) {
      return follow.map((following, index) => (
        <div className="recommended-follow-container" key={index}>
          <div className="recommended-follow-info">
            <Link to={`/profile/${following.recommended_follow_id}`}>
              <img src={following.image} alt="following" />
              <h2>{following.username}</h2>
            </Link>
          </div>
          <div className="follow-button">
            <button type="button" onClick={this.followAUserHandler}>
              Follow
            </button>
            {following.followed_by_username && (
              <p>Followed by {following.followed_by_username}</p>
            )}
          </div>
        </div>
      ));
    } else {
      return <h2>Loading...</h2>;
    }
  };

  render() {
    return (
      <StyledCard>
        <div className="sticky-container">{this.renderRecommended()}</div>
      </StyledCard>
    );
  }
}
const StyledCard = styled.div`
  margin: 60px 0px 0px 30px;
  height: auto;
  @media (max-width: 1200px) {
    display: none;
  }
  .sticky-container {
    position: sticky;
    top: 160px;
  }
  .recommended-follow-container {
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    padding: 10px;
    border-radius: 6px;
    min-width: 180px;
    .recommended-follow-info {
      display: flex;
      align-items: center;
      justify-content: center;
      h2 {
        /* margin-left: 10px; */
        margin: 8px auto;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: block;
        margin: auto;
      }
    }
    .follow-button {
      text-align: center;
      button {
        padding: 5px 10px;
        font-weight: 700;
        border: transparent;
        border-radius: 5px;
        background-color: #3f65f2;
        color: white;
        cursor: pointer;
        transition: 200ms ease-out;
        font-size: 1.4rem;
      }
      p {
        font-size: 1.2rem;
        opacity: 0.8;
        text-align: center;
        margin: 10px auto;
      }
    }
  }
`;

const mapStateToProps = ({ auth, user_details, follow }) => {
  return {
    auth: auth,
    user_details: user_details,
    follow: follow
  };
};

export default connect(
  mapStateToProps,
  { getUserProfileDetails, recommendedFollow }
)(RecommendedFollow);
