import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      width: '100%',
      textAlign: 'center',
      padding: '16px 0',
      background: 'var(--mocha-mousse-light1, #f5f5f5)',
      color: 'var(--mocha-mousse-dark4, #888)',
      fontSize: 16,
      fontWeight: 500,
      borderTop: '1px solid #eee',
      marginTop: 32
    }}>
      © {new Date().getFullYear()} Mocha Mousse. Всі права захищено.
    </footer>
  );
};

export default Footer; 