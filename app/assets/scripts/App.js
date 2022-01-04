import '../styles/styles.css';

console.log("hello i'f from webpack");
if (module.hot) {
  module.hot.accept();
}
