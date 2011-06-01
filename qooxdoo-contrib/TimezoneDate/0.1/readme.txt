TimezoneDate
============

The JavaScript Date object is fairly limiting, in that it has no provisions
for dealing with timezones other than the local one. Additionally, the format
of dates that Date.parse() can recognize is not well specified.

This class attempts to rectify those problems. Dates can be provided to, and
output from this class in user-selectable time zones.
