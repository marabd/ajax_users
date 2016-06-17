// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready(function() {
	var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users'

	// index path
	if (location.pathname === '/users') {
		function getUsers () {
			$.ajax({
				url: baseUrl,
				type: 'GET',
				dataType: 'JSON',
			}).done(function(data) {
				var tbody = $('#users');
				tbody.children().remove();
				data.users.forEach(function(user) {
					var first_name = user.first_name ? user.first_name : '';
					var last_name = user.last_name ? user.last_name : '';
					var phone_number = user.phone_number ? user.phone_number : '';
					var row = '<tr data-id="' + user.id + '">';
							row += '<td>' + first_name + '</td>';
							row += '<td>' + last_name + '</td>';
							row += '<td>' + phone_number + '</td>';
							row += '<td>';
							row += '<button class="btn btn-danger delete">Delete</button>';
							row += '</td>';
							row += '<td>';
							row += '<button class="btn btn-primary show">Show</button>';
							row += '</td>';
							row += '</td>';
							row += '</tr>';
							tbody.append(row);
				});
			}).fail(function(err) {
				alert("Something isn't right here...");
			});
		}
	getUsers();
	$(document).on('click', '.delete', function() {
		var id = $(this).closest('tr').data().id;
		deleteUser(id);
		// getUsers();
	});

	$(document).on('click', '.show', function() {
		var id=$(this).closest('tr').data().id;
		location.pathname = '/users' + id;
	})

	function deleteUser(id) {
		$.ajax({
			url: baseUrl + '/users' + id,
			type: 'DELETE'
		}).done(function() {
			alert("Success!");
			getUsers();
		}).fail(function(err) {
			alert("Something isn't right here...");
			})
		}
	}

	var re = /\/users\/\d+/;
	if (user.pathname.match(re)) {
		var panel = $('panel');
		var id = panel.data().id;
		$.ajax({
			url: baseUrl + '/' + id,
			type: 'GET',
			dataType: 'JSON',
		}).done(function(data) {
			var user = data.user;
			panel.children('#heading').html(user.name);
			var list = $('#user');
			var first_name = '<li>First Name: $' + user.first_name + '</li>';
			var last_name = '<li>Last Name: $' + user.last_name + '</li>';
			var phone_number = '<li>Phone Number: $' + user.phone_number + '</li>';
			list.append(first_name);
			list.append(last_name);
			list.append(phone_number);
		})
	}

	$('#new_user').on('submit', function(e) {
		e.preventDefault();
		$.ajax({
			url: baseUrl,
			type: 'POST',
			dataType: 'JSON',
			data: $(this).serializeArray()
		}).done(function() {
			location.pathname = '/';
		})
	})
})