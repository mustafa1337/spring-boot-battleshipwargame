package com.battleship.models;

import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Component;

// This is Player1 Model class for storing details of player1 
@Component
public class Player1 {

	int totalHits;
	int totalMissed;
	List<String> playerHits;
	List<String> playerSunkShips;

	public Player1() {
		this.totalHits = 0;
		this.playerSunkShips = new LinkedList<>();
		playerHits = new LinkedList<>();

	}

	public int getTotalMissed() {
		return totalMissed;
	}

	public void setTotalMissed(int totalMissed) {
		this.totalMissed = totalMissed;
	}

	public int getTotalHits() {
		return totalHits;
	}

	public void setTotalHits(int totalHits) {
		this.totalHits = totalHits;
	}

	public List<String> getPlayerHits() {
		return playerHits;
	}

	public void setPlayerHits(List<String> playerHits) {
		this.playerHits = playerHits;
	}

	public List<String> getPlayerSunkShips() {
		return playerSunkShips;
	}

	public void setPlayerSunkShips(List<String> playerSunkShips) {
		this.playerSunkShips = playerSunkShips;
	}

}
