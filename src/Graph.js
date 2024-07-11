import React from 'react';
import './Graph.css';

function Graph() {
  return (
    <div className="iframe-container">
      <div className="reps">
        <iframe title="Graph 1" width="80" height="50" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT6fHOobGijUdu7rc2ESvLpYG_lxftqaKdu5_F0y48KAEGqx7nDilV1DophtmjcUG3vqCQ0JWHcK2VR/pubchart?oid=2105081607&amp;format=interactive"></iframe>
        <iframe title="Graph 2" width="102" height="50" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT6fHOobGijUdu7rc2ESvLpYG_lxftqaKdu5_F0y48KAEGqx7nDilV1DophtmjcUG3vqCQ0JWHcK2VR/pubchart?oid=1075278028&amp;format=interactive"></iframe>
        <iframe title="Graph 3" width="102" height="50" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT6fHOobGijUdu7rc2ESvLpYG_lxftqaKdu5_F0y48KAEGqx7nDilV1DophtmjcUG3vqCQ0JWHcK2VR/pubchart?oid=1379746584&amp;format=interactive"></iframe>
      </div>
      <iframe title="Graph 4" width="102" height="50" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT6fHOobGijUdu7rc2ESvLpYG_lxftqaKdu5_F0y48KAEGqx7nDilV1DophtmjcUG3vqCQ0JWHcK2VR/pubchart?oid=1433934483&amp;format=interactive"></iframe>
      <iframe title="Graph 5" width="102" height="50" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT6fHOobGijUdu7rc2ESvLpYG_lxftqaKdu5_F0y48KAEGqx7nDilV1DophtmjcUG3vqCQ0JWHcK2VR/pubchart?oid=1210434199&amp;format=interactive"></iframe>
      <iframe class="Graph" title="Graph 6" width="371" height="380" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT6fHOobGijUdu7rc2ESvLpYG_lxftqaKdu5_F0y48KAEGqx7nDilV1DophtmjcUG3vqCQ0JWHcK2VR/pubchart?oid=197194374&amp;format=interactive"></iframe>
    </div>
  );
}

export default Graph;