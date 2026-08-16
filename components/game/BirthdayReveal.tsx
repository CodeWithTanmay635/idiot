export function BirthdayReveal({ open, message }: { open:boolean; message:string }) { return open ? <div className="card" style={{marginTop:20}}><h2>{message}</h2></div> : null; }
