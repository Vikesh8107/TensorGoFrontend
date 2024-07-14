import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/"
            style={{
              display: "block",
              padding: "10px 15px",
              textDecoration: "none",
              color: "#333",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f6cd7c")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
          >
            Home
          </Link>{" "}
        </li>
        {user ? (
          <>
            <li>
              <Link
                to="/dashboard"
                style={{
                  display: "block",
                  padding: "10px 15px",
                  textDecoration: "none",
                  color: "#333",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f6cd7c")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
              >
                Dashboard
              </Link>
            </li>
            <div>
              <button
                onClick={handleLogout}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "1rem 1rem",
                  color: "#fff",
                  backgroundColor: "#4741a5",
                  borderRadius: "0.6rem",
                  fontFamily: '"Source Sans 3", sans-serif',
                  fontWeight: "500",
                  fontSize: "1.125rem", // 18px, Tailwind text-lg
                  marginTop: "1.2rem",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#63b3ed")
                } // hover:bg-blue-300
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#8d38a3")
                }
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  style={{ marginRight: "0.5rem", marginLeft: "1rem" }}
                />
                Logout
              </button>
            </div>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
