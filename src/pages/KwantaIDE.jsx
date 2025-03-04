import { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import Editor from '@monaco-editor/react';
import Button from '../components/Button';
import Input from '../components/Input';
import TreeView from '../components/TreeView';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../services/firebase';

const app = initializeApp(firebaseConfig);

export default function KwantaIDE() {
  const [code, setCode] = useState('// Start coding here...');
  const [repo, setRepo] = useState('');
  const [branch, setBranch] = useState('main');
  const [commitMessage, setCommitMessage] = useState('Initial commit');
  const [octokit, setOctokit] = useState(null);
  const [fileStructure, setFileStructure] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('github_token');
    if (token) {
      setOctokit(new Octokit({ auth: token }));
    }
  }, []);

  const handleGitHubLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setAuthUser(result.user);
      alert(`Logged in as ${result.user.displayName}`);
    } catch (error) {
      console.error(error);
      alert('Error logging into GitHub');
    }
  };

  return (
    <div>
      <h1>Kwanta - VS-Style Web IDE</h1>
      <Button onClick={handleGitHubLogin}>Login with GitHub</Button>
      {authUser && <p>Welcome, {authUser.displayName}</p>}
      <TreeView files={fileStructure} onSelect={(file) => setSelectedFile(file)} />
      <Editor height='400px' language='javascript' value={code} onChange={setCode} />
      <Input placeholder='GitHub Repo' value={repo} onChange={(e) => setRepo(e.target.value)} />
    </div>
  );
}