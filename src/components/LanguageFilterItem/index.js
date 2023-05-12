import './index.css'

const LanguageFilterItem = props => {
  const {filterDetails, activeFilterId, changefilterId} = props

  const {id, language} = filterDetails

  const onClickFilter = () => {
    changefilterId(id)
  }

  let activeClassName

  if (id === activeFilterId) {
    activeClassName = 'activeFilter'
  } else {
    activeClassName = ''
  }

  return (
    <li className="list-container">
      <button
        className={`btn-container ${activeClassName}`}
        type="button"
        onClick={onClickFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
