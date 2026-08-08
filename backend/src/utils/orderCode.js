// Generates a short, human-friendly order code like VF-8K3F21
function generateOrderCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no confusing 0/O/1/I
  let code = 'VF-';
  for (let i = 0; i < 6; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

module.exports = { generateOrderCode };
