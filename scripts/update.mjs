import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./scripts/data/AllPrintings.json'));

const cardKingdomIds = {};
const cardNames = [];
const scryfallIds = {};
const setCodes = [];
const setIndexCardIndexMultiverseIds = {};
const setNames = [];
const tcgplayerProductIds = {};

for (const {
  cards,
  code: setCode,
  isOnlineOnly,
  name: setName,
} of Object.values(input.data)) {
  if (isOnlineOnly) {
    continue;
  }

  const setIndex = setNames.length;
  setCodes.push(setCode);
  setNames.push(setName);

  for (const {
    availability,
    identifiers: {
      cardKingdomId: cardKingdomIdStr,
      multiverseId: multiverseIdStr,
      scryfallId,
      tcgplayerProductId: tcgplayerProductIdStr,
    },
    name: cardName,
  } of cards) {
    if (availability.indexOf('paper') === -1) {
      continue;
    }

    const multiverseId = parseInt(multiverseIdStr, 10);
    if (Number.isNaN(multiverseId)) {
      continue;
    }

    const findCardName = card => card.name === cardName;
    let cardIndex = cardNames.findIndex(findCardName);
    if (cardIndex === -1) {
      cardIndex = cardNames.length;
      cardNames.push(cardName);
    }

    if (
      !Object.prototype.hasOwnProperty.call(
        setIndexCardIndexMultiverseIds,
        setIndex,
      )
    ) {
      setIndexCardIndexMultiverseIds[setIndex] = {};
    }
    setIndexCardIndexMultiverseIds[setIndex][cardIndex] = multiverseId;

    if (cardKingdomIdStr) {
      cardKingdomIds[multiverseId] = parseInt(cardKingdomIdStr, 10);
    }

    if (scryfallId) {
      scryfallIds[multiverseId] = scryfallId;
    }

    if (tcgplayerProductIdStr) {
      tcgplayerProductIds[multiverseId] = parseInt(tcgplayerProductIdStr, 10);
    }
  }
}

const cardKingdomIdsStr = JSON.stringify(cardKingdomIds, null, 0);
const cardNamesStr = JSON.stringify(cardNames, null, 0);
const setCodesStr = JSON.stringify(setCodes, null, 0);
const setNamesStr = JSON.stringify(setNames, null, 0);
const scryfallIdsStr = JSON.stringify(scryfallIds, null, 0);
const tcgplayerProductIdsStr = JSON.stringify(tcgplayerProductIds, null, 0);

const setIndexCardIndexMultiverseIdsStr = JSON.stringify(
  setIndexCardIndexMultiverseIds,
  null,
  0,
);

fs.writeFileSync('./src/data/card-names.json', cardNamesStr);
fs.writeFileSync('./src/data/card-kingdom-ids.json', cardKingdomIdsStr);
fs.writeFileSync('./src/data/set-codes.json', setCodesStr);
fs.writeFileSync('./src/data/set-names.json', setNamesStr);
fs.writeFileSync('./src/data/scryfall-ids.json', scryfallIdsStr);

fs.writeFileSync(
  './src/data/set-index-card-index-multiverse-ids.json',
  setIndexCardIndexMultiverseIdsStr,
);

fs.writeFileSync(
  './src/data/tcgplayer-product-ids.json',
  tcgplayerProductIdsStr,
);

fs.writeFileSync(
  './src/data/metadata.json',
  JSON.stringify(
    {
      cardKingdomIdsSize: cardKingdomIdsStr.length,
      cardNamesSize: cardNamesStr.length,
      date: input.meta.date,
      scryfallIdsSize: scryfallIdsStr.length,
      setCodesSize: setCodesStr.length,
      setIndexCardIndexMultiverseIdsSize:
        setIndexCardIndexMultiverseIdsStr.length,
      setNamesSize: setNamesStr.length,
      tcgplayerProductIdsSize: tcgplayerProductIdsStr.length,
    },
    null,
    2,
  ),
);
