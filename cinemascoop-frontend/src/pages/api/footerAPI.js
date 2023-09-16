import aboutContent from '../about.jsx';
import contactContent from '../contact.jsx';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const path = req.url.split('?')[0]; 

    if (path === '/about') {
      res.status(200).json(aboutContent); // Return content for About page
    } else if (path === '/contact') {
      res.status(200).json(contactContent); // Return content for Contact page
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}