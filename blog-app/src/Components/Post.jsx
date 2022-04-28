import { Link } from "react-router-dom";

function Post(props) {
  const article = props.article;
  return (
    <article className="article article-preview">
      <div className="flex justify-between align-center">
        <div className="flex align-center">
          <figure className="a-figure">
            <img
              src={article.author.image || ``}
              alt={article.author.username}
            />
          </figure>
          <div className="a-head">
            <Link to={`/article/${article.slug}`}>
              {article.author.username}
            </Link>
            <p>{article.createdAt.split("T")[0]}</p>
          </div>
        </div>
        <div>
          <button
            className={
              props.isLoggedIn
                ? article.favorited
                  ? "ac-like"
                  : "na-like"
                : ""
            }
            data-id={article.favorited}
            data-slug={article.slug}
            onClick={props.handleFavorite}
          >
            Like: {article.favoritesCount}
          </button>
        </div>
      </div>
      <div className="a-body">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <div className="flex justify-between">
          <Link to={`/article/${article.slug}`}>
            <span>Read More...</span>
          </Link>
          <span></span> {/* For tagList */}
        </div>
      </div>
    </article>
  );
}

export default Post;
