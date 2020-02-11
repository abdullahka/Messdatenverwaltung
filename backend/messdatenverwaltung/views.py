from django.http import HttpResponse, Http404
from os import listdir, stat
import json
import time
import rosbag

# Returns meta data for dashboard
def dashboard(request):
    latest = listdir('/code/rosbags/')
    dashboard_mockup = {
        'uploads': {
            'today': 1,
            'last_7days': [1,0,0,1,1,2,1]
        },
        'rosbags': {
            'latest': latest,
            'disk_usage': 24786935,
            'count': 7
        },
    }
    
    return HttpResponse(json.dumps(dashboard_mockup))

# Returns a list of all rosbags in the folder + meta info
# Meta info = file size, date created
def allRosbags(request):
    filenames = listdir('/code/rosbags/')
    rosbagsList = []

    for i in range(len(filenames)):
        fileStats = stat('/code/rosbags/'+filenames[i])
        rosbagsList.append({
            'filename': filenames[i],
            'size': fileStats.st_size,
            'created': time.ctime(fileStats.st_ctime)
        })

    return HttpResponse(json.dumps(rosbagsList))


def specificRosbag(request, filename):
    filenames = listdir('/code/rosbags/')

    if any(filename == s for s in filenames):
        fileUrl = '/code/rosbags/'+filename
        bag = rosbag.Bag(fileUrl, 'r')

        rosbagDetails = {
            'topic_meta': bag.get_type_and_topic_info(),
            'duration': (bag.get_end_time() - bag.get_start_time())
        }

        return HttpResponse(json.dumps(rosbagDetails))
    else:
        return Http404('Specified rosbag "'+ fileUrl + '"not found')