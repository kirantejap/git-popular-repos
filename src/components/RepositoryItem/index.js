import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props

  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoDetails

  return (
    <li className="repo-list-container">
      <img className="avatar" src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <div className="stats-container">
        <div className="details">
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="count">{starsCount} stars</p>
        </div>
        <div className="details">
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="count">{forksCount} forks</p>
        </div>
        <div className="details">
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="count">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
