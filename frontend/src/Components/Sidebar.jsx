import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.aside
      className={`sidebar ${isOpen ? "expanded" : ""}`}
      initial={{ width: "60px" }}
      animate={{ width: isOpen ? "200px" : "60px" }}
      transition={{ duration: 0.3 }}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="menu-btn">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={`menu-items ${isOpen ? "show" : "hide"}`}>
        <li>Home</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </motion.aside>
  );
};

export default Sidebar;