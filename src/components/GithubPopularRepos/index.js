import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeFilterId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
    repoList: [],
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {activeFilterId} = this.state
    console.log(activeFilterId)

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = fetchedData.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      console.log(updatedData)
      this.setState({
        repoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changefilterId = id => {
    this.setState({activeFilterId: id}, this.getRepositories)
  }

  renderSuccessView = () => {
    const {repoList} = this.state
    return (
      <ul className="ul-repos-container">
        {repoList.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderView = status => {
    if (status === apiStatusConstants.success) {
      return this.renderSuccessView()
    }
    return <p>hola</p>
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {activeFilterId, apiStatus} = this.state

    return (
      <div className="bg-container">
        <h1 className="head">Popular</h1>
        <ul className="filters-container">
          {languageFiltersData.map(eachFilter => (
            <LanguageFilterItem
              filterDetails={eachFilter}
              key={eachFilter.id}
              activeFilterId={activeFilterId}
              changefilterId={this.changefilterId}
            />
          ))}
        </ul>
        <div className="repositories-container">
          {apiStatus === apiStatusConstants.inProgress
            ? this.renderLoadingView()
            : this.renderView(apiStatus)}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
