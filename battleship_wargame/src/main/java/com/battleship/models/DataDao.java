package com.battleship.models;

public class DataDao { // this class is to get and set the Hit and Miss counter
	int hits = 0;
	int missed = 0;
	String ship;

	public int getHits() {
		return hits;
	}

	public void setHits(int hits) {
		this.hits = hits;
	}

	public int getMissed() {
		return missed;
	}

	public void setMissed(int missed) {
		this.missed = missed;
	}

	public String getShip() {
		return ship;
	}

	public void setShip(String ship) {
		this.ship = ship;
	}

}
