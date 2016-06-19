var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
        {
          this.props.children.map(function (child) {
            return <li>{child}</li>
          })
        }
      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);