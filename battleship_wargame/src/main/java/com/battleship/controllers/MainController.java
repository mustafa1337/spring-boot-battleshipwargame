package com.battleship.controllers;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.battleship.models.DataDao;
import com.battleship.models.Player1;
import com.battleship.models.Player2;
import com.battleship.models.ShipDao;
import com.battleship.models.ShipSizes;
import com.battleship.models.TurnDao;

// Controller class for handling all Restful API requests calls from 
// front end 
@RestController
@CrossOrigin()
public class MainController {
	// this is set collections for storing player1 ships after dragging and dropping
	// for use into player 2 page into player 1 game board, took set for distictions
	Set<ShipDao> player1Ships = new HashSet<>();
	// this is set collections for storing player2 ships after dragging and droping
	// for use into player1 page into player2 game board, took set for distictions
	Set<ShipDao> player2Ships = new HashSet<>();
	String playerTurn = "player2";
	String status = "No Won";
	// this object is for storing player1 details like ships sunk, hits, missed and
	// ships hit
	@Autowired
	Player1 player1;
	// this object for storing player2 details like ships sunk, hits, missed and
	// ships hit
	@Autowired
	Player2 player2;
	// This object stores sizes with names of all five ships for using if all blocks
	// of a ship have been hit
	// and then storing them into sunk ship collections
	@Autowired
	ShipSizes shipSizes;

	// this Api end point listen call on move of player1 for storing data about move
	// like hit
	// missed ship name is a ship sunk and then storing in sunk list
	@PostMapping("updatePlayer1")
	public void updatePlayer1(@RequestBody DataDao dataDao) {
		System.out.println("Player1");
		System.out.println(dataDao.getHits());
		System.out.println(dataDao.getMissed());
		System.out.println(dataDao.getShip());
		shipSizes.getShipSizes().get(dataDao.getShip());
		player1.getPlayerHits().stream().forEach(sh -> System.out.println(sh));
		if (dataDao.getHits() == 1) {
			player1.setTotalHits(player1.getTotalHits() + 1);
			System.out.println("Total Hits are " + player1.getTotalHits());
		}
		if (dataDao.getMissed() == 1) {
			player1.setTotalMissed(player1.getTotalMissed() + 1);
			System.out.println("Total Missed are " + player1.getTotalMissed());
		}
		if (!dataDao.getShip().equalsIgnoreCase("none")) {
			System.out.println("Added to Ship list");
			player1.getPlayerHits().add(dataDao.getShip());
			List<String> shipList = player1.getPlayerHits().stream()
					.filter(sh -> sh.equalsIgnoreCase(dataDao.getShip())).toList();
			if (shipList.size() == shipSizes.getShipSizes().get(dataDao.getShip())) {
				player1.getPlayerSunkShips().add(dataDao.getShip());
				System.out.println("Sunk Ships " + player1.getPlayerSunkShips().size());
				player1.getPlayerSunkShips().stream().forEach(e -> System.out.println(e));
				List<String> newList = player1.getPlayerHits().stream()
						.filter(sh -> !(sh.equalsIgnoreCase(dataDao.getShip()))).toList();
				player1.setPlayerHits(new LinkedList<String>(newList));
			}
		}

	}

	// this Api end point listen call on move of player2 for storing data about move
	// like hit
	// missed ship name is a ship sunk and then storing in sunk list
	@PostMapping("updatePlayer2")
	public void updatePlayer2(@RequestBody DataDao dataDao) {
		System.out.println("Player2");
		System.out.println(dataDao.getHits());
		System.out.println(dataDao.getMissed());
		System.out.println(dataDao.getShip());
		System.out.println(shipSizes.getShipSizes().get(dataDao.getShip()) + " Sizes");
		if (dataDao.getHits() == 1) {
			player2.setTotalHits(player2.getTotalHits() + 1);
			System.out.println("Total Hits are " + player2.getTotalHits());
		}
		if (dataDao.getMissed() == 1) {
			player2.setTotalMissed(player2.getTotalMissed() + 1);
			System.out.println("Total Missed are " + player2.getTotalMissed());
		}
		if (!dataDao.getShip().equalsIgnoreCase("none")) {
			System.out.println("Added to Ship list");
			System.out.println(dataDao.getShip());
			player2.getPlayerHits().add(dataDao.getShip());
			List<String> shipList = player2.getPlayerHits().stream()
					.filter(sh -> sh.equalsIgnoreCase(dataDao.getShip())).toList();
			if (shipList.size() == shipSizes.getShipSizes().get(dataDao.getShip())) {
				player2.getPlayerSunkShips().add(dataDao.getShip());
				System.out.println("Sunk Ships " + player2.getPlayerSunkShips().size());
				player2.getPlayerSunkShips().stream().forEach(e -> System.out.println(e));
				List<String> newList = player2.getPlayerHits().stream()
						.filter(sh -> !(sh.equalsIgnoreCase(dataDao.getShip()))).toList();
				player2.setPlayerHits(new LinkedList<String>(newList));
			}
		}

	}

	// This Api is called after every move of player1 to view the result and see if
	// sunk ship size is 5 then player1 is returned as winning otherwise no win
	@GetMapping("getPlayer1Result")
	public String getPlayer1Result() {
		System.out.println("Get Results player 1 method invoked");
		System.out.println("Sunk Ships " + player1.getPlayerSunkShips().size());
		player1.getPlayerSunkShips().stream().forEach(e -> System.out.println(e));
		if (player1.getPlayerSunkShips().size() == 5) {
			this.status = "player1";
			return status;
		} else {
			return status;
		}
	}

	// This Api is called after every move of player2 to view the result and see if
	// sunk ship size is 5 then player2 is returned as wining otherwise no win
	@GetMapping("getPlayer2Result")
	public String getPlayer2Result() {
		System.out.println("Get Results player 2 method invoked");
		System.out.println("Sunk Ships " + player2.getPlayerSunkShips().size());
		if (player2.getPlayerSunkShips().size() == 5) {
			this.status = "player2";
			return status;
		} else {
			return status;
		}
	}

	// This API is called after dragging of each ship by player1 to store ships into
	// Set
	// for adding into player2 page panel
	@PostMapping("addShipPlayer1")
	public void addShipPlayer1(@RequestBody ShipDao shipDao) {
		player1Ships.add(shipDao);
		System.out.println("Added Player1 Ships " + player1Ships.size());
		System.out.println("Added Ships Name " + shipDao.getName());
		System.out.println("Added Ships index " + shipDao.getStartindex());
	}

	// This API is called after dragging of each ship by player2 to store ships into
	// Set
	// for adding into player1 page panel on start
	@PostMapping("addShipPlayer2")
	public void addShipPlayer2(@RequestBody ShipDao shipDao) {
		player2Ships.add(shipDao);
		System.out.println("Added Player2 Ships " + player2Ships.size());
		System.out.println("Added Ships Name " + shipDao.getName());
		System.out.println("Added Ships length " + shipDao.getLength());
		System.out.println("Added Ships index " + shipDao.getStartindex());
	}

	// This end point is called on start button pressed by player2 and return set of
	// detail about
	// player1 ships with location index
	@GetMapping("startPlayer2")
	public Set<ShipDao> startPlayer2() {
		System.out.println("Player2 Start Function start");
		return player1Ships;
	}

	// This end point is called on start button pressed by player1 and return set of
	// detail about
	// player2 ships with location index
	@GetMapping("startPlayer1")
	public Set<ShipDao> startPlayer1() {
		System.out.println("Player1 Start Function start");
		return player2Ships;
	}

	// APi for getting turn of players
	@PostMapping("setTurn")
	public String setTurn(@RequestBody TurnDao turnDao) {
		System.out.println("this is set turn method with parameter " + turnDao.getTurn());
		playerTurn = turnDao.getTurn();
		return playerTurn;
	}

	@GetMapping("getTurn")
	public String getTurn() {
		System.out.println("this is get turn method");
		return playerTurn;
	}

	// This APi end point is called on clicking restart button for refreshing
	// everything
	@GetMapping("refresh")
	public void refresh() {
		System.out.println("Refresh method is called");
		player1Ships.clear();
		player2Ships.clear();
		player1.getPlayerHits().clear();
		player2.getPlayerHits().clear();
		player1.getPlayerSunkShips().clear();
		player2.getPlayerSunkShips().clear();
		player1.setTotalHits(0);
		player2.setTotalHits(0);
		player1.setTotalMissed(0);
		player2.setTotalMissed(0);
		status = "No Won";
	}

}
