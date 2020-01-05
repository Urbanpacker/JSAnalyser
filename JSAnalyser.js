'use strict';

// Counts the number of BMP images in the document
	
	function bmpImgCount(){
		var bmp = document.querySelectorAll('img[src$="bmp"], img[data-src$="bmp"]');
		var result ='' ;
		if(bmp.length > 0){
			result = 'Il y a '+bmp.length+' images .bmp dans le document.';
		} else {
			result = 'Il n\'y a aucune images .bmp dans le document.';
		}
		return result;
	}

// Counts the number of empty images in the document

	function emptyImage(){
		var emptyImg = document.querySelectorAll('img[src=""]', 'img[src=" "], img[not(src)]');
		var result = '';
		if(emptyImg.length > 0){
			result = 'Il y a '+emptyImg.length+' image(s) vide(s) sur la page.';
		} else {
			result = 'Il n\'y a aucune image vide sur la page courante.';
		}
		return result;
	}

// Counts the number of images with no alternative text in the alt attribute

	function noAltTextImage(){
		var noAltTextImg = document.querySelectorAll('img[alt=""]', 'img[alt=" "]', 'img:not([alt])');
		var result = '';
		if(noAltTextImg.length > 0){
			result ='Il y a '+noAltTextImg.length+' image(s) sans attribut "alt" sur la page.';
		} else {
			result = 'Il n\'y a aucune image sans attribut "alt" sur la page.';
		}
		return result;
	}

// Counts the number of characters contained in the meta description

	function metaDescTagLength(){
		let metaDesc = document.querySelector('meta[name="description"]');
		if(metaDesc){
			let metaDescLen = metaDesc.getAttribute("content").length;
		}
		let result = metaDesc ? 'Il y a '+ metaDescLen +' caractères dans la balise "meta description" de la page.' : 'Il n\'y pas de balise "meta description" dans la page.' ;
		return result ;
	}

// Counts the number of characters contained in the title tag

	function titleTagLength(){
		var result;
		var titleArray = document.getElementsByTagName('title');
		if(titleArray.length > 1){
			result = 'Il y a plusieurs balises title dans la page courante.';
		} else {
			let title = titleArray[0];
			let titleLen = title.textContent.length ;
			result = 'Il y a '+ titleLen +' caractères dans la balise "title" de la page.';
		}
		return result
	}

console.log(bmpImgCount());
console.log(emptyImage());
console.log(noAltTextImage());
console.log(titleTagLength());
console.log(metaDescTagLength());

function linksOutTable(displayRelativeURI = true){

	var links = document.querySelectorAll('a');

	var linkArray = [];


// Prepare the table in which the page elements will be displayed

	var table = document.createElement('table');
	table.setAttribute('style','margin:30px auto;max-width:85%; height:100%; width:100%; back-ground-color:#fff');
	let thead = document.createElement('thead');
	let theadRow = document.createElement('tr');
	
	var tbody = document.createElement('tbody');	

/* Names of the élements to display (these will be the <th> elements' content)*/
	var tableFields = [
			'Numéro',
			'Texte ou image d\'ancre',
			'URL de destination',
			'Attribut title'
		]

/* Creates and displays the <thead> row,
the first column specifies the number of items in the table */

	for(let i = 0, c = tableFields.length; i < c ; i++){
		var th = document.createElement('th');
		theadRow.append(th);
		if(tableFields[i] === 'Numéro'){
			th.textContent = tableFields[i] + ' (sur ' + links.length +')';
			theadRow.append(th);
			continue;
		}
		th.textContent = tableFields[i];
		theadRow.append(th);
	}

	/* Search the webpage for each tag <a> and get the following properties :
	- order in the page, - anchor text, - URI pointed at, - title attribute */

	for(let j = 0, d = links.length ; j < d ; j++ ){
		
		linkArray[j] = {
			number : j + 1,
			anchor : links[j].innerHTML,
			url : (displayRelativeURI ? links[j].getAttribute('href') : links[j].href),
			title : links[j].getAttribute('title')
		}
		var tr = document.createElement('tr');
		tbody.append(tr);

		/* Creates and fills a cell in the table with each <a> property gotten
		+ display the URI as a HTML link */

		for(var property in linkArray[j]){
			var td = document.createElement('td');
			if(property == 'url'){
				let a = document.createElement('a');
				a.setAttribute('href', linkArray[j][property]);
				a.setAttribute('style', 'color:blue;text-decoration:underline');
				a.textContent = linkArray[j][property] ;
				td.append(a);
			} else {
				td.innerHTML = linkArray[j][property];
			}
			tr.append(td);
		}	
	}

	let body = document.getElementsByTagName('body')[0];
	body.innerHTML ="";
	
	table.append(thead);
	thead.append(theadRow);
	table.append(tbody);

	body.append(table);

	let tableItems = document.querySelectorAll('th, td, tr');
	
	tableItems.forEach(function(value, index, array){
		value.setAttribute('style','margin:0;border: solid 0.5px #000; border-collapse:collapse; width:auto; max-width:35%');
	})

}

linksOutTable();
