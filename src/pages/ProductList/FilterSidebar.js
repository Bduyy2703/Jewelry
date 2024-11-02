import { useState } from 'react';
import styles from './FilterSidebar.module.scss';

export default function FilterSidebar() {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true, 
    materials: true,
    sizes: true
  });

  const categories = [
    { name: 'Earrings (Hoa tai)', expanded: false },
    { name: 'Rings (Nhẫn)', expanded: true },
    { name: 'Necklaces (Dây chuyền)', expanded: false },
    { name: 'Bracelets (Vòng tay)', expanded: false }
  ];

  const priceRanges = [
    'Dưới 500.000đ',
    'Từ 500.000đ - 1 triệu', 
    'Từ 1 triệu - 1.500.000đ',
    'Từ 1.500.000đ - 2 triệu',
    'Từ 2 triệu - 3 triệu'
  ];

  const materials = [
    'Bạc Y 925',
    'Ngọc Trai',
    'Đá CZ'
  ];

  const sizes = [
    'Nhỏ',
    'Trung', 
    'Lớn'
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.categorySection}>
        <h3 onClick={() => toggleSection('categories')} style={{cursor: 'pointer'}}>
          DANH MỤC SẢN PHẨM {expandedSections.categories ? '▼' : '▶'}
        </h3>
        {expandedSections.categories && categories.map((category, index) => (
          <div key={index} className={styles.categoryItem}>
            {category.name}
            {category.expanded && <span>+</span>}
          </div>
        ))}
      </div>

      <div className={styles.filterSection}>
        <h3 onClick={() => toggleSection('price')} style={{cursor: 'pointer'}}>
          CHỌN KHOẢNG GIÁ {expandedSections.price ? '▼' : '▶'}
        </h3>
        {expandedSections.price && priceRanges.map((range, index) => (
          <div key={index} className={styles.checkboxItem}>
            <input type="checkbox" id={`price-${index}`} />
            <label htmlFor={`price-${index}`}>{range}</label>
          </div>
        ))}

        <h3 onClick={() => toggleSection('materials')} style={{cursor: 'pointer'}}>
          CHẤT LIỆU CHÍNH {expandedSections.materials ? '▼' : '▶'}
        </h3>
        {expandedSections.materials && materials.map((material, index) => (
          <div key={index} className={styles.checkboxItem}>
            <input type="checkbox" id={`material-${index}`} />
            <label htmlFor={`material-${index}`}>{material}</label>
          </div>
        ))}

        <h3 onClick={() => toggleSection('sizes')} style={{cursor: 'pointer'}}>
          KÍCH THƯỚC {expandedSections.sizes ? '▼' : '▶'}
        </h3>
        {expandedSections.sizes && sizes.map((size, index) => (
          <div key={index} className={styles.checkboxItem}>
            <input type="checkbox" id={`size-${index}`} />
            <label htmlFor={`size-${index}`}>{size}</label>
          </div>
        ))}

        {/* Nút Lọc */}
        <div className={styles.filterButtonContainer}>
          <button className={styles.filterButton}>
            Lọc
          </button>
        </div>
      </div>
    </aside>
  );
}
