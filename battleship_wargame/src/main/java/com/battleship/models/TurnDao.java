package com.battleship.models;

public class TurnDao { // this class is to determine whos turn it is
	private String turn;
	private Integer num;

	public String getTurn() {
		return turn;
	}

	public void setTurn(String turn) {
		this.turn = turn;
	}

	public Integer getNum() {
		return num;
	}

	public void setNumber(Integer number) {
		this.num = number;
	}

}
