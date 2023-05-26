import protobuf from 'protobufjs'
import fetch from 'node-fetch'

const nyctSubwayProtoRoot = protobuf.loadSync('test.proto');
const FeedMessage = nyctSubwayProtoRoot.lookupType("transit_realtime.FeedMessage");

const fetchFeedUrl = (apiKey, feedUrl) => {
  return fetch(feedUrl, { headers: { 'x-api-key': apiKey } })
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const uint8array = new Uint8Array(buffer);
      const value = FeedMessage.decode(uint8array);
      return value;
    })
}

const key = 'WVmvBvMaMI2eYo2ltSDdm900nMJYWF0O5Jpp6k4s'
const url = 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm'

async function main() {
  const test = await fetchFeedUrl(key, url);
  console.log(test.entity[0].tripUpdate)
  // console.log(test.FeedMessage.entity[0])
}

main()