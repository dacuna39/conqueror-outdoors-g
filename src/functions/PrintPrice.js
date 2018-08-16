
export default function PrintPrice(price) {
  return parseFloat(Math.round((price) * 100) / 100).toFixed(2);
}