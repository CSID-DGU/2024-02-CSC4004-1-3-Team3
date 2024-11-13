// Details.js
import React from 'react';
import WorkDescription from './WorkDescription';
import ArtistDescription from './ArtistDescription';

function Details({ choice, id }) {
  return (
    <div>
      {choice === 1 && <WorkDescription id={id} />}
      {choice === 2 && <ArtistDescription id={id} />}
    </div>
  );
}

export default Details;
