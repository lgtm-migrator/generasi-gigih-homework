import Card from "components/card";
import usePlaylist from "lib/usePlaylist";
import { useState } from "react";

const Playlist = ({ data, auth, user }) => {
  const { handleTrackSelect, isTrackSelected, createPlaylist } = usePlaylist();
  const [form, setForm] = useState({
    name: "",
    description: "",
    public: false,
    collaborative: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist({ accessToken: auth.accessToken, userId: user.id, formPayload: form });
  };

  return (
    <>
      <div>
        {data.map((track) => (
          <Card data={track} key={track.uri} handleSelect={handleTrackSelect} isSelected={isTrackSelected(track)} />
        ))}
      </div>
      <div style={{ textAlign: "center", margin: "50px" }}>
        <h2>Create a Playlist</h2>
        <form id="createPlaylist" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" style={{ paddingLeft: "40px" }}>Name: </label>
            <input type="text" id="name" name="name" minLength="10" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" name="description" minLength="20" onChange={handleChange} />
          </div>
        </form>
        <button form="createPlaylist">Create</button>
      </div>
    </>
  );
};

export default Playlist;