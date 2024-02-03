import React, { useState } from 'react';
import { EtherscanProvider } from 'ethers';
import { Contract } from 'sevm';
import './App.css';

function Decompiler() {
	const [address, setAddress] = useState('');
	const [solidityCode, setSolidityCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleDecompile = async () => {
		setIsLoading(true);
		try {
			const provider = new EtherscanProvider(); // Corrected the import name
			const bytecode = await provider.getCode(address);
			const contract = new Contract(bytecode); // Assuming 'patchdb' is no longer needed
			setSolidityCode(contract.solidify()); // Assuming 'solidify' is the correct method
		} catch (error) {
			console.error('Error decompiling contract:', error);
			setSolidityCode('Error decompiling contract.');
		} finally {
			setIsLoading(false); // Ensures loading state is reset even if an error occurs
		}
	};

	return (
		<div className="content">
			<h1>Hacked by Unverified Contract? Decompile the Bytecode</h1>
			<h4>Try this unverified contract:
				<a href="https://etherscan.io/token/0xf5ac35838d2d58158e2487ed5b5e47879c519397"
					target="_blank" rel="noopener noreferrer">
					0xf5ac35838d2d58158e2487ed5b5e47879c519397
				</a>
			</h4>

			<div className="decompiler-container">
				<input
					type="text"
					className="decompiler-input"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder="Enter contract address"
				/>
				<button className="decompiler-button" onClick={handleDecompile} disabled={isLoading}>
					{isLoading ? 'Decompiling...' : 'Decompile'}
				</button>
				<div className="output-box">
					{isLoading ?
						<p className="loading-text">Loading...</p> :
						<pre className="solidity-code">{solidityCode}</pre>
					}
				</div>
			</div>
		</div>
	);
}

export default Decompiler;
