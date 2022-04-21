function Pagination(props) {
  let { articlesCount, articlesPerPage } = props;
  let numberOfPages = Math.ceil(articlesCount / articlesPerPage);
  let pagesArray = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pagesArray.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() =>
          props.updateActivePageIndex(
            props.activePageIndex - 1 < 1 ? 1 : props.activePageIndex - 1
          )
        }
      >
        Prev
      </button>
      {pagesArray.map((page, i) => (
        <button
          key={i}
          className={props.activePageIndex === page ? "active" : ""}
          onClick={() => props.updateActivePageIndex(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() =>
          props.updateActivePageIndex(
            props.activePageIndex + 1 > props.numberOfPages
              ? numberOfPages
              : props.activePageIndex + 1
          )
        }
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
