import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Streamhub Exam Project
      </p>
      <p>
        Built with React By A.P.
      </p>
    </footer>
  );
}