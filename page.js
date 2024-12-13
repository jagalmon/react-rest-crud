"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [resultMap, setResultMap] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // 초기 데이터 가져오기
  useEffect(() => {
    fetch("/api/route")
      .then((res) => res.json())
      .then((data) => setResultMap(data))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  // 새로운 항목 추가
  const addNewItem = async () => {
    if (!newTitle.trim()) return; // 빈 제목 방지
    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, completed: false }),
      });
      if (!res.ok) throw new Error("Failed to add item");
      const newItem = await res.json();
      setResultMap((prev) => [...prev, newItem]);
      setNewTitle(""); // 입력 필드 초기화
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  // 항목 상태 업데이트
  const toggleCompleted = async (id) => {
    const item = resultMap.find((item) => item.id === id);
    try {
      const res = await fetch("/api/route", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !item.completed }),
      });
      if (!res.ok) throw new Error("Failed to update item");
      setResultMap((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  // 항목 삭제
  const deleteItem = async (id) => {
    try {
      const res = await fetch("/api/route", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete item");
      setResultMap((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "16px" }}>ResultMap</h1>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Enter new title"
        style={{ marginRight: "8px" }}
      />
      <button onClick={addNewItem}>Add Row</button>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Completed</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resultMap.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{item.id}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{item.title}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.completed ? "Yes" : "No"}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button onClick={() => toggleCompleted(item.id)} style={{ marginRight: "16px" }}>
                  Toggle
                </button>
                <button onClick={() => deleteItem(item.id)}>RowDel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
