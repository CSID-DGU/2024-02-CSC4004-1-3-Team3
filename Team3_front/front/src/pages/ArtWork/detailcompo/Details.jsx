// Details.js
import React from 'react';
import WorkDescription from './WorkDescription';
import ArtistDescription from './ArtistDescription';

function Details({ choice, artwork }) {
  return (
    <div>
      {choice === 1 && <WorkDescription artwork={artwork} />}
      {choice === 2 && <ArtistDescription artwork={artwork} />}
    </div>
  );
}

export default Details;
