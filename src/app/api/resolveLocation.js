export default function handler(
  res, req
) {
  opencage.geocode({ q: '33 carriage lane, Hanover, NH' })
    .then(data => {
      console.log(JSON.stringify(data));
      if (data.status.code == 200) {
        if (data.results.length > 0) {
          var place = data.results[0];
          console.log(place.formatted);
        }
      } else if (data.status.code == 402) {
        console.log('hit free trial daily limit');
        console.log('become a customer: https://opencagedata.com/pricing');
      } else {
        // other possible response codes:
        // https://opencagedata.com/api#codes
        console.log('error', data.status.message);
      }
    });
}