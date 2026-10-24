"use client";
import { useState } from "react";
import styles from "./Demos.module.css";
type Listing = { id: number; name: string; price: number; original: number; icon: string; stock: number };
const initial: Listing[] = [
  { id: 1, name: "Bakery surprise bag", price: 4, original: 12, icon: "🥐", stock: 3 },
  { id: 2, name: "Market produce box", price: 5, original: 15, icon: "🥑", stock: 2 },
  { id: 3, name: "Lunch rescue bowl", price: 3, original: 10, icon: "🥗", stock: 4 },
];
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
export function RemeliDemo() {
  const [role, setRole] = useState("Buyer");
  const [listings, setListings] = useState(initial);
  const [orders, setOrders] = useState<Listing[]>([]);
  const [message, setMessage] = useState("Choose a meal to try checkout.");
  const [ticket, setTicket] = useState<"none" | "open" | "resolved">("none");
  function order(item: Listing) {
    if (item.stock < 1) return;
    setListings(items => items.map(x => x.id === item.id ? { ...x, stock: x.stock - 1 } : x));
    setOrders(items => [...items, item]);
    setMessage(`Demo order confirmed: ${item.name}. Saved ${money(item.original - item.price)}. No payment taken.`);
  }
  function reset() { setListings(initial); setOrders([]); setTicket("none"); setMessage("Demo reset. Choose a discounted meal."); }
  return <section className={styles.demo} aria-label="Remeli marketplace demo">
    <div className={styles.top}><strong>remeli<span className={styles.green}>✳</span></strong><button onClick={reset} type="button">Reset</button></div>
    <p className={styles.note}>Interactive demo · Sample listings and prices. No real orders.</p>
    <div className={styles.tabs} role="group" aria-label="Marketplace role">{["Buyer", "Seller", "Admin"].map(item => <button type="button" key={item} aria-pressed={role === item} onClick={() => setRole(item)}>{item}</button>)}</div>
    <div className={styles.phone}>
      <div className={styles.phoneTop}><span>remeli</span><span>{role}</span></div>
      <div className={styles.phoneBody} tabIndex={0} aria-label={`${role} demo screen`}>
        {role === "Buyer" && <><h3>Good food. Less waste.</h3><p className={styles.note}>Today’s pickup · Demo neighborhood</p>
          {listings.map(item => <article key={item.id} className={styles.food}><span className={styles.foodIcon} aria-hidden="true">{item.icon}</span><div><h4>{item.name}</h4><p><strong>{money(item.price)}</strong> <del>{money(item.original)}</del> <span className={styles.green}>−{Math.round((1-item.price/item.original)*100)}%</span></p><small>{item.stock} left</small></div><button type="button" disabled={!item.stock} onClick={() => order(item)} aria-label={`Order ${item.name}`}>{item.stock ? "Order" : "Sold out"}</button></article>)}
          {orders.length > 0 && <div className={styles.receipt}><strong>{orders.length} demo {orders.length === 1 ? "order" : "orders"}</strong><span>Saved {money(orders.reduce((sum,x) => sum+x.original-x.price, 0))}</span><button type="button" disabled={ticket !== "none"} onClick={() => { setTicket("open"); setMessage("Support request opened. Switch to Admin to resolve it."); }}>{ticket === "none" ? "Ask about pickup" : ticket === "open" ? "Support request open" : "Support resolved"}</button></div>}
        </>}
        {role === "Seller" && <><h3>List surplus food.</h3><form className={styles.form} onSubmit={event => { event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const name = String(data.get("name") ?? "").trim(); const price = Number(data.get("price")), original = Number(data.get("original")); if (!name || !Number.isFinite(price) || !Number.isFinite(original) || price <= 0 || original <= price) { setMessage("Enter a name and a discounted price below the original price."); return; } setListings(items => [...items, { id: Math.max(...items.map(x => x.id))+1, name, price, original, stock: 3, icon: "🍱" }]); setMessage(`${name} is listed. Switch to Buyer to order it.`); form.reset(); }}>
          <label>Food name<input name="name" required maxLength={50} placeholder="Evening pastry box"/></label><div className={styles.formRow}><label>Original price ($)<input name="original" type="number" required min="0.02" max="999" step="0.01" defaultValue="12"/></label><label>Rescue price ($)<input name="price" type="number" required min="0.01" max="998" step="0.01" defaultValue="4"/></label></div><button className={styles.primary} type="submit">Publish demo listing</button></form><p className={styles.note}>{listings.length} listings · {orders.length} orders</p></>}
        {role === "Admin" && <><h3>Support inbox</h3><p className={styles.note}>Illustrative support flow</p><div className={styles.ticket}>{ticket === "none" ? <p>No requests yet. Place a Buyer order, then select “Ask about pickup.”</p> : <><strong>Pickup question</strong><p>Where do I collect my order?</p><span className={styles.green}>{ticket === "resolved" ? "Resolved · Pickup instructions shared" : "Open request"}</span><button type="button" disabled={ticket === "resolved"} onClick={() => { setTicket("resolved"); setMessage("Request resolved. The buyer now sees the updated status."); }}>Send pickup instructions</button></>}</div></>}
      </div>
    </div>
    <p className={styles.status} role="status">{message}</p>
  </section>;
}
