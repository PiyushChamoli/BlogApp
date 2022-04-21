import Loader from "./Loader";
import Post from "./Post";

function Posts(props) {
  if (props.error) {
    return <p>{props.error}</p>;
  }
  if (!props.articles) {
    return <Loader />;
  } else if (props.articles.length < 1) {
    return <h2>There are no articles</h2>;
  }
  return (
    <>
      {props.articles.map((article, i) => (
        <Post key={article.slug} article={article} />
      ))}
    </>
  );
}

export default Posts;
